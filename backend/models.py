# db has to be referenced here
from datetime import datetime
from sqlmodel import SQLModel, Field


# its also possible to add a __init__ method which can be used to instantiate the clas
class Strategy(SQLModel, table=True):
    id: int | None = Field(primary_key=True, default=None)
    strategy_name: str
    description: str
    whenToUse: str
    nakedPutsDelta: str
    pdsLongPutDelta: str
    pdsWidth: str
    pdsNPRCostRatio: str
    technicalIndicators: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
