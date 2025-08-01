namespace FocusFlow.Models;

public class TaskListViewModel
{
    public string? Header { get; init; }
    public IEnumerable<TaskItemViewModel> TaskItems { get; init; } = [];
    
    public bool ShowCompleted { get; init; } = true;
    public bool ShowDateSelector { get; init; } = true;
    
    public DateTime? StartDate { get; init; }
    public DateTime? EndDate { get; init; }
}