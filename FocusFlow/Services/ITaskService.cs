using FocusFlow.Data.Entities;

namespace FocusFlow.Services;

public interface ITaskService
{
    Task<List<TaskItem>> GetAllAsync();
    Task<TaskItem> CreateEmptyTaskAsync();
}