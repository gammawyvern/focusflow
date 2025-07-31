namespace FocusFlow.Models;

public class TaskListViewModel
{
    public required string Controller { get; init; }
    public string? Header { get; init; }
    public IEnumerable<TaskItemViewModel> TaskItems { get; init; } = [];
}