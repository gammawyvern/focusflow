namespace FocusFlow.Models;

public class TaskListViewModel
{
    public string? Header { get; init; }
    
    public TaskSublistViewModel? ActiveTaskSublist { get; init; }
    public TaskSublistViewModel? IncompleteTaskSublist { get; init; }
    public TaskSublistViewModel? CompleteTaskSublist { get; init; }
    
    public bool ShowDateSelector { get; init; } = true;
    
    public DateTime? StartDate { get; init; }
    public DateTime? EndDate { get; init; }
}