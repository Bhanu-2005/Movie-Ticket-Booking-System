from fastapi import APIRouter, Depends, status

from app.dependencies.auth_dependency import get_current_user

from app.schemas.payment_schema import PaymentCreate

from app.services.payment_service import create_payment



router = APIRouter(
    prefix="/payments",
    tags=["Payments"]
)


@router.post("/", status_code=status.HTTP_201_CREATED)
async def make_payment(
    payment: PaymentCreate,
    current_user=Depends(get_current_user)
):

    payment = await create_payment(
        payment
    )

    return {

        "success": True,

        "message": "Payment successful.",

        "data": payment

    }