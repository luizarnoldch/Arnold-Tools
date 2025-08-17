"use client"

import { useTRPC } from '@/trpc/client'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

type Props = {}

const PolarPage = (props: Props) => {

  const trpc = useTRPC()
  const { data } = useQuery(trpc.premium.getFreeUsage.queryOptions())

  if (!data) return null

  return (
    <div className='p-4'>
      Current Plan: {data.subscriptionType}
    </div>
  )
}

export default PolarPage
