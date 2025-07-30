using FocusFlow.Data.Entities;

namespace FocusFlow.Services;

public interface ITaskService
{
    Task<List<TaskItem>> GetAllAsync();
    Task<TaskItem> CreateEmptyTaskAsync();
    Task DeleteTaskAsync(int id);
    Task SetTaskCompleteAsync(int id, bool complete);
}