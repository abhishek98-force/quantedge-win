"""initial migrations

Revision ID: 94a49d5e2eef
Revises: 0e25765a435f
Create Date: 2024-11-26 21:44:30.030909

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

import sqlmodel
from datetime import datetime

# revision identifiers, used by Alembic.
revision: str = "94a49d5e2eef"
down_revision: Union[str, None] = "0e25765a435f"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table(
        "strategy",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("strategy_name", sqlmodel.sql.sqltypes.AutoString(), nullable=False),
        sa.Column("description", sqlmodel.sql.sqltypes.AutoString(), nullable=False),
        sa.Column("whenToUse", sqlmodel.sql.sqltypes.AutoString(), nullable=False),
        sa.Column("nakedPutsDelta", sqlmodel.sql.sqltypes.AutoString(), nullable=False),
        sa.Column(
            "pdsLongPutDelta", sqlmodel.sql.sqltypes.AutoString(), nullable=False
        ),
        sa.Column("pdsWidth", sqlmodel.sql.sqltypes.AutoString(), nullable=False),
        sa.Column(
            "pdsNPRCostRatio", sqlmodel.sql.sqltypes.AutoString(), nullable=False
        ),
        sa.Column(
            "technicalIndicators", sqlmodel.sql.sqltypes.AutoString(), nullable=False
        ),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    # ### end Alembic commands ###
    strategies = [
        {
            "strategy_name": "LT112",
            "description": "Optimized for stable markets with a 50-wide protective PDS, balancing premium collection with risk management.",
            "whenToUse": "Normal to slightly bullish markets.",
            "nakedPutsDelta": "2x at 5-7 Delta",
            "pdsLongPutDelta": "25 (variable)",
            "pdsWidth": "25-50",
            "pdsNPRCostRatio": "1:3",
            "technicalIndicators": "12-day EMA above 26-day EMA; Price above 50-day SMA, indicating immediate bullish momentum and a strong short to medium-term uptrend.",
            "created_at": datetime.utcnow(),
        },
        {
            "strategy_name": "BA112",
            "description": "Aimed at longer, deeper sell-offs with a defensive stance by positioning naked puts further OTM (lower delta), widening the width of the trap and collecting less overall premium due to NPs being further OTM.",
            "whenToUse": "Expecting a serious market correction rather than a shorter pull back.",
            "nakedPutsDelta": "2x at 3-5 Delta",
            "pdsLongPutDelta": "25",
            "pdsWidth": "50 (or smaller)",
            "pdsNPRCostRatio": "1:1",
            "technicalIndicators": "26-day EMA below 12-day EMA and approaching 50-day SMA from above; RSI > 75, indicating potential overextension and readiness for a correction.",
            "created_at": datetime.utcnow(),
        },
        {
            "strategy_name": "FB112",
            "description": "Optimized for smaller market pullbacks, involves setting up a fatter PDS trap to sweeten the profits on a pullback. Generally, means a trap >50 points wide",
            "whenToUse": "Good strategy when fundamentals are strong but the market is overbought, indicating a short-term correction may be warranted.",
            "nakedPutsDelta": "2x at 5-6 Delta",
            "pdsLongPutDelta": "25-50",
            "pdsWidth": "50-100",
            "pdsNPRCostRatio": "1:2",
            "technicalIndicators": "12-day EMA significantly above 26-day EMA; Price touches or exceeds upper Bollinger Band, RSI > 70, signaling overbought conditions ripe for a pullback.",
            "created_at": datetime.utcnow(),
        },
        {
            "strategy_name": "111",
            "description": "A variant of FB112 focusing on overbought markets, where the credit from a single Naked Put is used exclusively to finance the PDS, aiming for minimal risk exposure.",
            "whenToUse": "Overbought markets, fully leveraging NP credit for PDS, to minimize risk.",
            "nakedPutsDelta": "1x at 5-6 Delta",
            "pdsLongPutDelta": "Not specified",
            "pdsWidth": "50-100",
            "pdsNPRCostRatio": "1:1",
            "technicalIndicators": "Similar to FB112: 12-day EMA above 26-day EMA during clear overbought conditions; Price approaches or touches upper Bollinger Band, further confirmed by RSI > 70.",
            "created_at": datetime.utcnow(),
        },
    ]

    op.bulk_insert(
        sa.table(
            "strategy",
            sa.Column("strategy_name", sa.String()),
            sa.Column("description", sa.String()),
            sa.Column("whenToUse", sa.String()),
            sa.Column("nakedPutsDelta", sa.String()),
            sa.Column("pdsLongPutDelta", sa.String()),
            sa.Column("pdsWidth", sa.String()),
            sa.Column("pdsNPRCostRatio", sa.String()),
            sa.Column("technicalIndicators", sa.String()),
            sa.Column("created_at", sa.DateTime()),
        ),
        strategies,
    )


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table("strategy")
    # ### end Alembic commands ###
