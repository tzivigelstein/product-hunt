import styled from "@emotion/styled"

const SkeletonProduct = styled.li`
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  position: relative;
`

const SkeletonContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 2rem;
  z-index: 2;
`

const SkeletonImage = styled.div`
  width: 142px;
  aspect-ratio: 1.06 / 1;
  background-color: #f0f0f0;
  border-radius: 5px;
`

const SkeletonDetails = styled.div`
  flex: 0 1 600px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: flex-start;
`

const SkeletonText = styled.div`
  width: ${props => (props.width ? `${props.width}%` : "80%")};
  height: 16px;
  background-color: #f0f0f0;
  border-radius: 4px;
`

const SkeletonVotes = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0 0 auto;
  text-align: center;
  background-color: #f0f0f0;
  padding: 1rem 0.5rem;
  border-radius: 4px;
  z-index: 2;
  width: 62px;
  height: 74px;
`

export default function ProductDetailSkeleton({ hideVote }) {
  return (
    <SkeletonProduct>
      <SkeletonContent>
        <SkeletonImage />
        <SkeletonDetails>
          <SkeletonText />
          <SkeletonText width={120} />
          <SkeletonText />
        </SkeletonDetails>
      </SkeletonContent>
      {!hideVote && <SkeletonVotes />}
    </SkeletonProduct>
  )
}

export function ProductListSkeleton({ loading, hideVote = false }) {
  return (
    <>
      {loading &&
        [...Array(5)].map((_, index) => (
          <ProductDetailSkeleton key={index} hideVote={hideVote} />
        ))}
    </>
  )
}
