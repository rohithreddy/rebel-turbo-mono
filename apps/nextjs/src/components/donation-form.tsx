"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@barebel/ui/button"
import { Input } from "@barebel/ui/input"
import { Label } from "@barebel/ui/label"
import { RadioGroup, RadioGroupItem } from "@barebel/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@barebel/ui/tabs"

export default function DonationForm({ campaignId: _campaignId }: { campaignId: string }) {
  const [customAmount, setCustomAmount] = useState("")
  const [selectedAmount, setSelectedAmount] = useState("500")

  const handleAmountChange = (value: string) => {
    setSelectedAmount(value)
    if (value === "custom") {
      setCustomAmount("")
    }
  }

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value)
  }

  const getAmount = () => {
    if (selectedAmount === "custom") {
      return customAmount ? Number.parseInt(customAmount) : 0
    }
    return Number.parseInt(selectedAmount)
  }

  return (
    <div className="mt-4">
      <Tabs defaultValue="oneTime">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="oneTime">One-time</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
        </TabsList>

        <TabsContent value="oneTime" className="space-y-4 mt-4">
          <RadioGroup value={selectedAmount} onValueChange={handleAmountChange}>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <RadioGroupItem value="500" id="amount-500" className="sr-only" />
                <Label
                  htmlFor="amount-500"
                  className={`flex h-10 items-center justify-center rounded-md border ${
                    selectedAmount === "500" ? "border-orange-600 bg-orange-50" : "border-input"
                  } text-sm font-medium cursor-pointer`}
                >
                  ₹500
                </Label>
              </div>
              <div>
                <RadioGroupItem value="1000" id="amount-1000" className="sr-only" />
                <Label
                  htmlFor="amount-1000"
                  className={`flex h-10 items-center justify-center rounded-md border ${
                    selectedAmount === "1000" ? "border-orange-600 bg-orange-50" : "border-input"
                  } text-sm font-medium cursor-pointer`}
                >
                  ₹1,000
                </Label>
              </div>
              <div>
                <RadioGroupItem value="2000" id="amount-2000" className="sr-only" />
                <Label
                  htmlFor="amount-2000"
                  className={`flex h-10 items-center justify-center rounded-md border ${
                    selectedAmount === "2000" ? "border-orange-600 bg-orange-50" : "border-input"
                  } text-sm font-medium cursor-pointer`}
                >
                  ₹2,000
                </Label>
              </div>
              <div>
                <RadioGroupItem value="5000" id="amount-5000" className="sr-only" />
                <Label
                  htmlFor="amount-5000"
                  className={`flex h-10 items-center justify-center rounded-md border ${
                    selectedAmount === "5000" ? "border-orange-600 bg-orange-50" : "border-input"
                  } text-sm font-medium cursor-pointer`}
                >
                  ₹5,000
                </Label>
              </div>
              <div>
                <RadioGroupItem value="10000" id="amount-10000" className="sr-only" />
                <Label
                  htmlFor="amount-10000"
                  className={`flex h-10 items-center justify-center rounded-md border ${
                    selectedAmount === "10000" ? "border-orange-600 bg-orange-50" : "border-input"
                  } text-sm font-medium cursor-pointer`}
                >
                  ₹10,000
                </Label>
              </div>
              <div>
                <RadioGroupItem value="custom" id="amount-custom" className="sr-only" />
                <Label
                  htmlFor="amount-custom"
                  className={`flex h-10 items-center justify-center rounded-md border ${
                    selectedAmount === "custom" ? "border-orange-600 bg-orange-50" : "border-input"
                  } text-sm font-medium cursor-pointer`}
                >
                  Custom
                </Label>
              </div>
            </div>
          </RadioGroup>

          {selectedAmount === "custom" && (
            <div>
              <Label htmlFor="custom-amount">Enter amount (₹)</Label>
              <Input
                id="custom-amount"
                type="number"
                placeholder="Enter amount"
                value={customAmount}
                onChange={handleCustomAmountChange}
              />
            </div>
          )}

          <Button className="w-full bg-orange-600 hover:bg-orange-700">Donate ₹{getAmount().toLocaleString()}</Button>
        </TabsContent>

        <TabsContent value="monthly" className="space-y-4 mt-4">
          <RadioGroup value={selectedAmount} onValueChange={handleAmountChange}>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <RadioGroupItem value="200" id="monthly-200" className="sr-only" />
                <Label
                  htmlFor="monthly-200"
                  className={`flex h-10 items-center justify-center rounded-md border ${
                    selectedAmount === "200" ? "border-orange-600 bg-orange-50" : "border-input"
                  } text-sm font-medium cursor-pointer`}
                >
                  ₹200/mo
                </Label>
              </div>
              <div>
                <RadioGroupItem value="500" id="monthly-500" className="sr-only" />
                <Label
                  htmlFor="monthly-500"
                  className={`flex h-10 items-center justify-center rounded-md border ${
                    selectedAmount === "500" ? "border-orange-600 bg-orange-50" : "border-input"
                  } text-sm font-medium cursor-pointer`}
                >
                  ₹500/mo
                </Label>
              </div>
              <div>
                <RadioGroupItem value="1000" id="monthly-1000" className="sr-only" />
                <Label
                  htmlFor="monthly-1000"
                  className={`flex h-10 items-center justify-center rounded-md border ${
                    selectedAmount === "1000" ? "border-orange-600 bg-orange-50" : "border-input"
                  } text-sm font-medium cursor-pointer`}
                >
                  ₹1,000/mo
                </Label>
              </div>
              <div>
                <RadioGroupItem value="2000" id="monthly-2000" className="sr-only" />
                <Label
                  htmlFor="monthly-2000"
                  className={`flex h-10 items-center justify-center rounded-md border ${
                    selectedAmount === "2000" ? "border-orange-600 bg-orange-50" : "border-input"
                  } text-sm font-medium cursor-pointer`}
                >
                  ₹2,000/mo
                </Label>
              </div>
              <div>
                <RadioGroupItem value="5000" id="monthly-5000" className="sr-only" />
                <Label
                  htmlFor="monthly-5000"
                  className={`flex h-10 items-center justify-center rounded-md border ${
                    selectedAmount === "5000" ? "border-orange-600 bg-orange-50" : "border-input"
                  } text-sm font-medium cursor-pointer`}
                >
                  ₹5,000/mo
                </Label>
              </div>
              <div>
                <RadioGroupItem value="custom" id="monthly-custom" className="sr-only" />
                <Label
                  htmlFor="monthly-custom"
                  className={`flex h-10 items-center justify-center rounded-md border ${
                    selectedAmount === "custom" ? "border-orange-600 bg-orange-50" : "border-input"
                  } text-sm font-medium cursor-pointer`}
                >
                  Custom
                </Label>
              </div>
            </div>
          </RadioGroup>

          {selectedAmount === "custom" && (
            <div>
              <Label htmlFor="custom-monthly-amount">Enter monthly amount (₹)</Label>
              <Input
                id="custom-monthly-amount"
                type="number"
                placeholder="Enter amount"
                value={customAmount}
                onChange={handleCustomAmountChange}
              />
            </div>
          )}

          <Button className="w-full bg-orange-600 hover:bg-orange-700">
            Donate ₹{getAmount().toLocaleString()}/month
          </Button>
        </TabsContent>
      </Tabs>

      <p className="text-xs text-gray-500 mt-4">Your donation will be processed securely. A small processing fee may apply.</p>
    </div>
  )
}
