using FocusFlow.Data.Entities;
using FocusFlow.Repositories;
using Microsoft.Extensions.Options;

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
    
    public async Task SetTaskCompleteAsync(int id, bool complete)
    {
        var entity = await taskItemRepository.GetByIdAsync(id);
        if (entity != null)
        {
            entity.IsCompleted = complete;
            await taskItemRepository.SaveChangesAsync();
        }
    }

    public async Task UpdateTaskAsync(int id, string? title, string? description, DateOnly? dueDate, long? secondsLogged)
    {
        var entity = await taskItemRepository.GetByIdAsync(id);
        if (entity == null) return;
        
        if (title != null) entity.Title = title;
        if (description != null) entity.Description = description;
        if (dueDate != null) entity.DueDate = dueDate.Value;
        if (secondsLogged != null) entity.SecondsLogged = secondsLogged.Value;
        await taskItemRepository.SaveChangesAsync();
    }
}