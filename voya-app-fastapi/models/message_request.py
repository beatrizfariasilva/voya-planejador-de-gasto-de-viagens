from pydantic import BaseModel, Field

class ViagemRequest(BaseModel):
    Destino: str = Field(..., min_length=1)
    Dias: int = Field(..., gt=0)
    Pessoas: int = Field(..., gt=0)
    Hospedagem: int = Field(..., ge=1, le=3)
    Alimentação: int = Field(..., ge=1, le=3)
    Passeios: int = Field(..., ge=1, le=3)
    VidaNoturna: int = Field(..., ge=1, le=3)