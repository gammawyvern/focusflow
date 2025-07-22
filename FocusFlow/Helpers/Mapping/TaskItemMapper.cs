using FocusFlow.Models;
using FocusFlow.Data.Entities;

namespace FocusFlow.Helpers.Mapping;

public static class TaskItemMapper
{
    public static TaskSummaryViewModel TaskItemToTaskSummaryViewModel(TaskItem taskItem)
    {
        return new TaskSummaryViewModel
        {
            Id = taskItem.Id,
            Title = taskItem.Title,
            Description = taskItem.Description,
            IsCompleted = taskItem.IsCompleted,
            SecondsLogged = taskItem.SecondsLogged,
            DueDate = taskItem.DueDate,
            IsActive = false
        };
    }
}