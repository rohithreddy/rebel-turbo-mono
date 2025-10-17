"use client"

import { useState } from "react"
import { Button } from "@barebel/ui/button"
import { Badge } from "@barebel/ui/badge"
import { Progress } from "@barebel/ui/progress"
import { ThumbsUp, Trophy, Star, Users } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@barebel/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@barebel/ui/tooltip"

interface VoterProps {
  id: string
  name: string
  image?: string
  points: number
  voted: boolean
}

interface ProposalProps {
  id: string
  title: string
  description: string
  author: {
    id: string
    name: string
    image?: string
    reputation: number
  }
  votes: number
  votesNeeded: number
  status: "pending" | "approved" | "rejected" | "implemented"
  category: string
  tags: string[]
  voters: VoterProps[]
  createdAt: string
  userHasVoted?: boolean
}

export default function GamifiedVoting({ proposal, onVote }: { proposal: ProposalProps; onVote?: () => void }) {
  const [voted, setVoted] = useState(proposal.userHasVoted ?? false)
  const [votes, setVotes] = useState(proposal.votes)
  const [showVoters, setShowVoters] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleVote = () => {
    if (!voted) {
      setIsAnimating(true)
      setVoted(true)
      setVotes(votes + 1)

      if (onVote) onVote()
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-500"
      case "rejected":
        return "bg-red-500"
      case "implemented":
        return "bg-blue-500"
      default:
        return "bg-yellow-500"
    }
  }

  const progressPercentage = (votes / proposal.votesNeeded) * 100

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border-2 border-orange-100">
            <AvatarImage src={proposal.author.image ?? "/placeholder.svg"} alt={proposal.author.name} />
            <AvatarFallback>{proposal.author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <p className="font-medium">{proposal.author.name}</p>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge variant="outline" className="bg-orange-50 text-orange-700 text-xs flex items-center gap-1">
                      <Star className="h-3 w-3 fill-orange-500 text-orange-500" />
                      {proposal.author.reputation}
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Reputation points</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <p className="text-xs text-gray-500">{proposal.createdAt}</p>
          </div>
        </div>
        <Badge className={`${getStatusColor(proposal.status)} text-white capitalize`}>{proposal.status}</Badge>
      </div>

      <h3 className="text-lg font-bold mb-2">{proposal.title}</h3>
      <p className="text-gray-600 mb-4">{proposal.description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        <Badge variant="outline" className="bg-orange-50 text-orange-700">
          {proposal.category}
        </Badge>
        {proposal.tags.map((tag) => (
          <Badge key={tag} variant="outline" className="bg-gray-50">
            {tag}
          </Badge>
        ))}
      </div>

      <div className="mb-6">
        <div className="flex justify-between text-sm mb-1">
          <span className="font-medium">{votes} votes</span>
          <span className="text-gray-500">{proposal.votesNeeded} needed</span>
        </div>
        <Progress
          value={progressPercentage}
          className="h-2 bg-gray-100"
          indicatorClassName={progressPercentage >= 100 ? "bg-green-500" : "bg-orange-500"}
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            onClick={() => setShowVoters(!showVoters)}
            variant="outline"
            size="sm"
            className="text-gray-500 flex items-center gap-1"
          >
            <Users className="h-4 w-4" />
            {proposal.voters.length}
          </Button>

          <div className="flex -space-x-2">
            {proposal.voters.slice(0, 3).map((voter) => (
              <TooltipProvider key={voter.id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Avatar className="h-6 w-6 border-2 border-white">
                      <AvatarImage src={voter.image ?? "/placeholder.svg"} alt={voter.name} />
                      <AvatarFallback>{voter.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{voter.name}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
            {proposal.voters.length > 3 && (
              <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-600 border-2 border-white">
                +{proposal.voters.length - 3}
              </div>
            )}
          </div>
        </div>

        <div className="relative">
          <Button
            onClick={handleVote}
            disabled={voted}
            className={`flex items-center gap-2 ${
              voted ? "bg-gray-100 text-gray-500" : "bg-orange-600 hover:bg-orange-700"
            }`}
          >
            <ThumbsUp className={`h-4 w-4 ${voted ? "fill-gray-500" : ""}`} />
            {voted ? "Voted" : "Vote"}
          </Button>

          <AnimatePresence>
            {isAnimating && (
              <motion.div
                initial={{ scale: 0.5, opacity: 0, y: 0 }}
                animate={{ scale: 1.5, opacity: 1, y: -20 }}
                exit={{ opacity: 0 }}
                onAnimationComplete={() => setIsAnimating(false)}
                className="absolute -top-2 -right-2"
              >
                <Trophy className="h-6 w-6 text-yellow-500 fill-yellow-500" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {showVoters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-4 pt-4 border-t border-gray-100">
              <h4 className="font-medium mb-2">Voters</h4>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {proposal.voters.map((voter) => (
                  <div key={voter.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={voter.image ?? "/placeholder.svg"} alt={voter.name} />
                        <AvatarFallback>{voter.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{voter.name}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      +{voter.points} pts
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
