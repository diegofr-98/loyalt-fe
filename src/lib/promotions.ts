type PromotionLike = {
  startDate: string
  finishDate: string
}

export function isPromotionValid(
  promotion: PromotionLike,
  currentDate = new Date()
) {
  const startDate = new Date(promotion.startDate)
  const finishDate = new Date(promotion.finishDate)

  if (Number.isNaN(startDate.getTime()) || Number.isNaN(finishDate.getTime())) {
    return false
  }

  return currentDate >= startDate && currentDate <= finishDate
}
