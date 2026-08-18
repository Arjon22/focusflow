from sqlalchemy import Boolean, Column, DateTime, ForeignKey, Integer, String, Text

from app.database import Base


class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,
        index=True,
    )

    title = Column(String, nullable=False)

    notes = Column(Text, nullable=True)

    priority = Column(
        String,
        nullable=False,
        default="medium",
    )

    due_date = Column(String, nullable=True)

    due_time = Column(String, nullable=True)

    completed = Column(
        Boolean,
        nullable=False,
        default=False,
    )

    reminder = Column(
        String,
        nullable=False,
        default="none",
    )

    repeat = Column(
        String,
        nullable=False,
        default="none",
    )

    reminded = Column(
        Boolean,
        nullable=False,
        default=False,
    )

    created_at = Column(
        DateTime,
        nullable=False,
    )

    updated_at = Column(
        DateTime,
        nullable=False,
    )