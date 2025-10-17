interface UserPoints {
  userId: string
  points: number
  action: string
  timestamp: number
  campaignId?: string
  proposalId?: string
}

interface Badge {
  id: string
  name: string
  description: string
  icon: string
  color: string
  requiredPoints?: number
  requiredActions?: {
    type: string
    count: number
  }[]
}

interface UserBadge {
  userId: string
  badgeId: string
  earnedAt: number
}

export class GamificationService {
  private static instance: GamificationService
  private userPoints: Partial<Record<string, UserPoints[]>>
  private userBadges: Partial<Record<string, UserBadge[]>>

  private badges: Badge[] = [
    {
      id: "solution-star",
      name: "Solution Star",
      description: "Proposed 5 solutions that received at least 10 votes each",
      icon: "star",
      color: "orange",
      requiredActions: [{ type: "solution-proposed", count: 5 }],
    },
    {
      id: "top-contributor",
      name: "Top Contributor",
      description: "Earned 200+ points through various contributions",
      icon: "trophy",
      color: "yellow",
      requiredPoints: 200,
    },
    {
      id: "verified-visitor",
      name: "Verified Visitor",
      description: "Conducted 3+ site visits to verify campaigns",
      icon: "map-pin",
      color: "blue",
      requiredActions: [{ type: "site-visit", count: 3 }],
    },
    {
      id: "solution-expert",
      name: "Solution Expert",
      description: "Proposed 10+ solutions with high approval rates",
      icon: "award",
      color: "orange",
      requiredActions: [{ type: "solution-proposed", count: 10 }],
    },
    {
      id: "rising-star",
      name: "Rising Star",
      description: "Earned 50+ points in your first month",
      icon: "trending-up",
      color: "green",
      requiredPoints: 50,
    },
    {
      id: "resourceful",
      name: "Resourceful",
      description: "Proposed solutions that saved campaigns 20%+ in resources",
      icon: "lightbulb",
      color: "blue",
    },
    {
      id: "campaign-creator",
      name: "Campaign Creator",
      description: "Created 3+ campaigns",
      icon: "flag",
      color: "purple",
      requiredActions: [{ type: "campaign-created", count: 3 }],
    },
  ]

  private constructor() {
    this.userPoints = {}
    this.userBadges = {}
  }

  public static getInstance(): GamificationService {
    if (!GamificationService.instance) {
      GamificationService.instance = new GamificationService()
    }
    return GamificationService.instance
  }

  // Award points to a user
  awardPoints(
    userId: string,
    action: string,
    points: number,
    metadata: Record<string, unknown> = {},
  ): {
    success: boolean
    totalPoints: number
    newBadges: Badge[]
  } {
    const entries = (this.userPoints[userId] ??= [])

    const pointEntry: UserPoints = {
      userId,
      points,
      action,
      timestamp: Date.now(),
      ...metadata,
    }

    entries.push(pointEntry)

    // Check for new badges
    const newBadges = this.checkForNewBadges(userId)

    return {
      success: true,
      totalPoints: this.getUserTotalPoints(userId),
      newBadges,
    }
  }

  // Get total points for a user
  getUserTotalPoints(userId: string): number {
    const entries = this.userPoints[userId]
    if (!entries) return 0

    return entries.reduce((total, entry) => total + entry.points, 0)
  }

  // Get user badges
  getUserBadges(userId: string): Badge[] {
    const badges = this.userBadges[userId]
    if (!badges) return []

    return badges
      .map((userBadge) => this.badges.find((badge) => badge.id === userBadge.badgeId))
      .filter(Boolean) as Badge[]
  }

  // Check if user qualifies for new badges
  private checkForNewBadges(userId: string): Badge[] {
    const newBadges: Badge[] = []
    const userTotalPoints = this.getUserTotalPoints(userId)

    const badgesForUser = (this.userBadges[userId] ??= [])

    // Get IDs of badges the user already has
    const existingBadgeIds = badgesForUser.map((ub) => ub.badgeId)

    // Check each badge
    for (const badge of this.badges) {
      // Skip if user already has this badge
      if (existingBadgeIds.includes(badge.id)) continue

      let qualifies = true

      // Check points requirement
      if (badge.requiredPoints && userTotalPoints < badge.requiredPoints) {
        qualifies = false
      }

      // Check action requirements
      if (badge.requiredActions) {
        for (const requiredAction of badge.requiredActions) {
          const actionCount = this.userPoints[userId].filter((p) => p.action === requiredAction.type).length

          if (actionCount < requiredAction.count) {
            qualifies = false
            break
          }
        }
      }

      // Award badge if qualified
      if (qualifies) {
        badgesForUser.push({
          userId,
          badgeId: badge.id,
          earnedAt: Date.now(),
        })

        newBadges.push(badge)
      }
    }

    return newBadges
  }

  // Get leaderboard
  getLeaderboard(limit = 10): {
    userId: string
    points: number
    rank: number
    badges: Badge[]
  }[] {
    const userTotals = Object.keys(this.userPoints).map((userId) => ({
      userId,
      points: this.getUserTotalPoints(userId),
      badges: this.getUserBadges(userId),
    }))

    userTotals.sort((a, b) => b.points - a.points)

    return userTotals.slice(0, limit).map((user, index) => ({
      ...user,
      rank: index + 1,
    }))
  }

  // Record a vote on a proposal
  recordVote(
    userId: string,
    proposalId: string,
    campaignId: string,
  ): {
    success: boolean
    pointsAwarded: number
    newBadges: Badge[]
  } {
    const result = this.awardPoints(userId, "proposal-vote", 5, { proposalId, campaignId })

    return {
      success: true,
      pointsAwarded: 5,
      newBadges: result.newBadges,
    }
  }

  // Record a solution proposal
  recordSolutionProposal(
    userId: string,
    proposalId: string,
    campaignId: string,
  ): {
    success: boolean
    pointsAwarded: number
    newBadges: Badge[]
  } {
    const result = this.awardPoints(userId, "solution-proposed", 10, { proposalId, campaignId })

    return {
      success: true,
      pointsAwarded: 10,
      newBadges: result.newBadges,
    }
  }

  // Record a site visit
  recordSiteVisit(
    userId: string,
    campaignId: string,
  ): {
    success: boolean
    pointsAwarded: number
    newBadges: Badge[]
  } {
    const result = this.awardPoints(userId, "site-visit", 20, { campaignId })

    return {
      success: true,
      pointsAwarded: 20,
      newBadges: result.newBadges,
    }
  }
}

export default GamificationService.getInstance()
