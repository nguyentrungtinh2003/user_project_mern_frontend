import ActionTypes from '../constants/ActionTypes'

const handleLocationChange = (
    pathname,
    currentBoardId,
    currentCardId,
    isEditModeEnabled,
    board,
    users,
    projects,
    boardMemberShips,
    labels,
    lists,
    cards,
    cardMemberShips,
    cardLabels,
    taskLists,
    tasks,
    attachments,
    customFieldGroups,
    customFields,
    customFieldValues,
    notificationsToDelete
) => ({
    type: ActionTypes.LOCATION_CHANGE_HANDLE,
    payload: {
        pathname,
        currentBoardId,
        currentCardId,
        isEditModeEnabled,
        board,
        users,
        projects,
        boardMemberShips,
        labels,
        lists,
        cards,
        cardMemberShips,
        cardLabels,
        taskLists,
        tasks,
        attachments,
        customFieldGroups,
        customFields,
        customFieldValues,
        notificationsToDelete,
    },
})

handleLocationChange.fetchContent = () => ({
    type: ActionTypes.LOCATION_CHANGE_HANDLE_CONTENT_FETCH,
    payload: {},
})

handleLocationChange.fetchBoard = (id) => ({
    type: ActionTypes.LOCATION_CHANGE_HANDLE_BOARD_FETCH,
    payload: { id },
})

export default { handleLocationChange }
