namespace FocusFlow.Models;

public class TaskListViewModel
{
    public string? Header { get; init; }
    
    public IEnumerable<TaskItemViewModel> ActiveTaskItems { get; init; } = [];
    public IEnumerable<TaskItemViewModel> IncompleteTaskItems { get; init; } = [];
    public IEnumerable<TaskItemViewModel> CompleteTaskItems { get; init; } = [];
    
    public bool ShowDateSelector { get; init; } = true;
    
    public DateTime? StartDate { get; init; }
    public DateTime? EndDate { get; init; }
}