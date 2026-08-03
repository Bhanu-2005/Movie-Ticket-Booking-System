from fastapi import Depends, HTTPException, status

from app.dependencies.auth_dependency import get_current_user


async def get_current_admin(
    current_user=Depends(get_current_user)
):

    if current_user.get("role") != "admin":

        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required."
        )

    return current_user