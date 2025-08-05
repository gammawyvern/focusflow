namespace FocusFlow.Models;

public class TaskSublistViewModel
{
    public required string SublistId { get; init; }
    public string? StyleClass { get; init; }
    public string? Header { get; init; }
    public List<TaskItemViewModel> TaskItemViews { get; init; } = [];
}