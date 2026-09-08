import {
    ListTodo,
    Clock3,
    CheckCircle2,
    AlertCircle
} from "lucide-react";

import { useTasks } from "../../context/TaskContext";

const StatsCards = () => {

    const { tasks } = useTasks();

    const total = tasks.length;

    const completed =
        tasks.filter(
            (task) =>
                task.status === "completed" ||
                task.status === "done"
        ).length;

    const pending =
        tasks.filter(
            (task) =>
                task.status !== "completed" &&
                task.status !== "done"
        ).length;

    const high =
        tasks.filter(
            (task) =>
                task.priority?.toLowerCase() === "high"
        ).length;

    const cards = [
        {
            title: "Total Tasks",
            value: total,
            description: "All tasks",
            icon: <ListTodo size={20} />,
            type: "purple"
        },
        {
            title: "Pending",
            value: pending,
            description: "Need attention",
            icon: <Clock3 size={20} />,
            type: "orange"
        },
        {
            title: "Completed",
            value: completed,
            description: "Successfully done",
            icon: <CheckCircle2 size={20} />,
            type: "green"
        },
        {
            title: "High Priority",
            value: high,
            description: "Important tasks",
            icon: <AlertCircle size={20} />,
            type: "red"
        }
    ];

    return (
        <section className="stats-grid">

            {cards.map((card) => (

                <div
                    className="stat-card"
                    key={card.title}
                >

                    <div
                        className={`stat-icon ${card.type}`}
                    >
                        {card.icon}
                    </div>

                    <div className="stat-info">

                        <span>
                            {card.title}
                        </span>

                        <strong>
                            {card.value}
                        </strong>

                        <small>
                            {card.description}
                        </small>

                    </div>

                </div>

            ))}

        </section>
    );
};

export default StatsCards;