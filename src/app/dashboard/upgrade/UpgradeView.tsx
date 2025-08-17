"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { authClient } from "@/lib/auth-client"
import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query"
import { ReactNode } from "react"

type Props = {}

const UpgradeView = (props: Props) => {
  const trpc = useTRPC()
  const { data: products } = useSuspenseQuery(
    trpc.premium.getProducts.queryOptions()
  )

  const { data: currentSubscription } = useSuspenseQuery(
    trpc.premium.getCurrentSubcription.queryOptions()
  )

  return (
    <div className="p-4">
      <h5 className="text-2xl">
        You are on the {" "}
        <span className="font-semibold text-green-500">
          {currentSubscription?.name ?? "Free"}
        </span>
      </h5>
      <div className="py-4 flex gap-4">
        {products.map((product) => {
          const isCurrentProduct = currentSubscription?.id === product.id
          const isPremium = !!currentSubscription

          let buttonText = "Upgrade"
          let onClick = () => authClient.checkout({ products: [product.id] })

          if (isCurrentProduct) {
            buttonText = "Manage"
            onClick = () => authClient.customer.portal()
          } else if (isPremium) {
            buttonText = "Change Plan"
            onClick = () => authClient.customer.portal()
          }

          return <UpgradeViewCard
            key={product.id}
            buttonText={buttonText}
            price={
              product.prices[0].amountType === "fixed"
                ? product.prices[0].priceAmount / 100
                : 0
            }
            description={product.description}
            priceSuffix={`/${product.prices[0].recurringInterval}`}
            onClick={onClick} />
        })}
      </div>
    </div>
  )
}

export default UpgradeView


type PropsUpgradeViewCard = {
  price: ReactNode
  buttonText: string,
  description: string | null
  priceSuffix: string
  onClick: () => void
}

const UpgradeViewCard = ({ buttonText, price, description, priceSuffix, onClick }: PropsUpgradeViewCard) => {
  return (
    <Card>
      <CardContent>
        <div>Price: {price}</div>
        <div>PriceSuffix: {priceSuffix}</div>
        <div>Description: {description}</div>
        <Button onClick={onClick} className="my-4">
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  )
}

