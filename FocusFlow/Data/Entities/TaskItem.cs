namespace FocusFlow.Data.Entities;

public sealed class TaskItem : BaseEntity
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public bool IsCompleted { get; set; } = false;
    public long SecondsLogged { get; set; } = 0;
    public DateOnly DueDate { get; set; } = DateOnly.FromDateTime(DateTime.Now);
}