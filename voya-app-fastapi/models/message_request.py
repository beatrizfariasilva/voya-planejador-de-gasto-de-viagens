from pydantic import BaseModel, Field

class ViagemRequest(BaseModel):
    dias: int = Field(..., gt=0)
    pessoas: int = Field(..., gt=0)
    hospedagem: int = Field(..., ge=1, le=3)
    alimentacao: int = Field(..., ge=1, le=3)
    passeios: int = Field(..., ge=1, le=3)
    vidaNoturna: int = Field(..., ge=1, le=3)