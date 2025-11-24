// Board.jsx
import { useState } from "react";
import {
    DndContext,
    PointerSensor,
    useSensor,
    useSensors,
    closestCorners,
    DragOverlay,
    useDroppable
} from "@dnd-kit/core";
import {
    SortableContext,
    useSortable,
    arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { getColumnColor, getPriorityColor, kanbanColumns } from "./Homeinfo";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { MoreHorizontal, Plus } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";


function SortableCard({ card, column }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: card.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <Card
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={`
                select-none rounded-lg border px-3 py-2 text-left shadow-sm cursor-grab active:cursor-grabbing 
                border-l-4 ${getColumnColor(column)} hover:shadow-md transition-shadow cursor-pointer
                ${isDragging ? "opacity-60 ring-2 ring-sky-500/60" : "opacity-100"}
                `}
            key={card.id}
        >
            <CardContent className="p-3">
                <div className="flex items-start justify-between gap-2 mb-2">
                    <p className="text-sm font-medium leading-tight">{card.title}</p>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="size-6 -mt-1">
                                <MoreHorizontal className="size-3" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Move to...</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                {card.project && (
                    <div className="text-xs text-muted-foreground mb-3">
                        {card.project}
                    </div>
                )}
                {card.priority && (
                    <div className="flex items-center justify-between">
                        <Badge
                            variant="outline"
                            className={`text-xs px-2 py-0 ${getPriorityColor(card.priority)}`}
                        >
                            {card.priority}
                        </Badge>
                        <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs">
                                {card.assignee}
                            </AvatarFallback>
                        </Avatar>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

function Column({ column, children }) {
    const { setNodeRef, isOver } = useDroppable({
        id: column.id,
    });

    return (
        <div
            ref={setNodeRef}
            className={"flex flex-col gap-3" +
                (isOver ? "ring-2 ring-sky-500/60" : "")
            }
        >
            <div className="mb-2 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                    <span className="font-medium">
                        {column.title}
                    </span>
                    <Badge variant="secondary" className="rounded-full">
                        {column.tasks.length}
                    </Badge>
                </div>
                <Button variant="ghost" size="icon" className="size-6">
                    <Plus className="size-4" />
                </Button>
            </div>

            <div className="flex flex-1 flex-col gap-2">
                {children}
            </div>
        </div>
    );
}

export default function Board() {
    const [columns, setColumns] = useState(kanbanColumns);
    const [activeCard, setActiveCard] = useState(null);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        })
    );

    const findColumnByCardId = (cardId) => {
        return columns.find((col) =>
            col.tasks.some((card) => card.id === cardId)
        );
    };

    const findColumnByIdOrCardId = (id) => {
        const colById = columns.find((col) => col.id === id);
        if (colById) return colById;

        return findColumnByCardId(id);
    };

    const handleDragStart = (event) => {
        const { active } = event;
        const column = findColumnByCardId(active.id);
        if (!column) return;

        const card = column.tasks.find((c) => c.id === active.id);
        setActiveCard(card || null);
    };

    const handleDragOver = () => {
        // Nếu cần realtime update khi đang drag thì xử lý ở đây
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (!over) {
            setActiveCard(null);
            return;
        }

        if (active.id === over.id) {
            setActiveCard(null);
            return;
        }

        const activeColumn = findColumnByCardId(active.id);
        const overColumn = findColumnByIdOrCardId(over.id);

        if (!activeColumn || !overColumn) {
            setActiveCard(null);
            return;
        }

        const activeColumnId = activeColumn.id;
        const overColumnId = overColumn.id;

        if (activeColumnId === overColumnId) {
            const columnIndex = columns.findIndex(
                (col) => col.id === activeColumnId
            );
            const column = columns[columnIndex];

            const oldIndex = column.tasks.findIndex(
                (card) => card.id === active.id
            );
            const newIndex = column.tasks.findIndex(
                (card) => card.id === over.id
            );

            if (oldIndex === -1 || newIndex === -1) {
                setActiveCard(null);
                return;
            }

            const newCards = arrayMove(column.tasks, oldIndex, newIndex);
            const newColumns = [...columns];
            newColumns[columnIndex] = {
                ...column,
                tasks: newCards,
            };
            setColumns(newColumns);
        } else {
            const sourceColumnIndex = columns.findIndex(
                (col) => col.id === activeColumnId
            );
            const destColumnIndex = columns.findIndex(
                (col) => col.id === overColumnId
            );

            const sourceColumn = columns[sourceColumnIndex];
            const destColumn = columns[destColumnIndex];

            const activeCardIndex = sourceColumn.tasks.findIndex(
                (card) => card.id === active.id
            );

            const overCardIndex = destColumn.tasks.findIndex(
                (card) => card.id === over.id
            );

            const cardToMove = sourceColumn.tasks[activeCardIndex];

            const newSourceCards = [...sourceColumn.tasks];
            newSourceCards.splice(activeCardIndex, 1);

            const newDestCards = [...destColumn.tasks];
            if (overCardIndex === -1) {
                newDestCards.push(cardToMove);
            } else {
                newDestCards.splice(overCardIndex, 0, cardToMove);
            }

            const newColumns = [...columns];
            newColumns[sourceColumnIndex] = {
                ...sourceColumn,
                tasks: newSourceCards,
            };
            newColumns[destColumnIndex] = {
                ...destColumn,
                tasks: newDestCards,
            };

            setColumns(newColumns);
        }

        setActiveCard(null);
    };

    return (
        <div className="">
            <DndContext
                sensors={sensors}
                collisionDetection={closestCorners}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {columns.map((column) => (
                        <SortableContext
                            key={column.id}
                            id={column.id}
                            items={column.tasks.map((card) => card.id)}
                        >
                            <Column column={column}>
                                {column.tasks.map((card) => (
                                    <SortableCard key={card.id} card={card} column={column.id} />
                                ))}
                            </Column>
                        </SortableContext>
                    ))}
                </div>

                <DragOverlay>
                    {activeCard ? (
                        // <div className="w-72 select-none rounded-lg border border-slate-600 bg-slate-900/95 px-3 py-2 text-left shadow-lg">
                        //     <div className="text-sm font-medium text-slate-100">
                        //         {activeCard.title}
                        //     </div>
                        //     {activeCard.project && (
                        //         <div className="mt-1 text-xs text-slate-400">
                        //             {activeCard.project}
                        //         </div>
                        //     )}
                        // </div>
                        <Card
                            className={`
                                select-none rounded-lg border px-3 py-2 text-left shadow-sm cursor-grab active:cursor-grabbing 
                            `}
                        >
                            <CardContent className="p-3">
                                <div className="flex items-start justify-between gap-2 mb-2">
                                    <p className="text-sm font-medium leading-tight">{activeCard.title}</p>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="size-6 -mt-1">
                                                <MoreHorizontal className="size-3" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>Edit</DropdownMenuItem>
                                            <DropdownMenuItem>Move to...</DropdownMenuItem>
                                            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                                {activeCard.project && (
                                    <div className="text-xs text-muted-foreground mb-3">
                                        {activeCard.project}
                                    </div>
                                )}
                                {activeCard.priority && (
                                    <div className="flex items-center justify-between">
                                        <Badge
                                            variant="outline"
                                            className={`text-xs px-2 py-0 ${getPriorityColor(activeCard.priority)}`}
                                        >
                                            {activeCard.priority}
                                        </Badge>
                                        <Avatar className="h-6 w-6">
                                            <AvatarFallback className="text-xs">
                                                {activeCard.assignee}
                                            </AvatarFallback>
                                        </Avatar>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    ) : null}
                </DragOverlay>
            </DndContext>
        </div>
    );
}
