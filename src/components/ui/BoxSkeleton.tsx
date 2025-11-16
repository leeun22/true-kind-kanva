import React from 'react'

interface BoxSkeletonProps {
  height: string
}

export default function BoxSkeleton({ height }: BoxSkeletonProps) {
  return <div className="!block animate-pulse duration-75 bg-gray-200 w-full" style={{ height: height }}></div>
}
