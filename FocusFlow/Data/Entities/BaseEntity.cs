namespace FocusFlow.Data.Entities;

public abstract class BaseEntity
{
    public int Id { get; init; }
    public DateTime CreatedOn { get; init; } = DateTime.UtcNow;
    public DateTime UpdatedOn { get; set; } = DateTime.UtcNow;
}