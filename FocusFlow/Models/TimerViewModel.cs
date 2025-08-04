namespace FocusFlow.Models;

public class TimerViewModel
{
    public int? ActiveTaskItemId { get; init; }
    public DateTime? StartedTime { get; init; }
    
    public TaskSublistViewModel? ActiveTaskSublist {  get; init; }
}
