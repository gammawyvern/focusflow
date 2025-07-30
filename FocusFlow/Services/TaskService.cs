using FocusFlow.Data.Entities;
using FocusFlow.Repositories;

namespace FocusFlow.Services;

public class TaskService(ITaskItemRepository taskItemRepository): ITaskService
{
    public async Task<TaskItem> CreateEmptyTaskAsync()
    {
        var entity = new TaskItem();
        await taskItemRepository.AddAsync(entity);
        await taskItemRepository.SaveChangesAsync();
        return entity;
    }
    
    public async Task<List<TaskItem>> GetAllAsync()
    {
        var entities = await taskItemRepository.GetAllAsync();
        return entities.ToList();
    }

    public async Task DeleteTaskAsync(int id)
    {
        var entity = await taskItemRepository.GetByIdAsync(id);
        if (entity != null)
        {
            taskItemRepository.Delete(entity);
            await taskItemRepository.SaveChangesAsync();
        }
    }
}