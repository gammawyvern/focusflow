using Microsoft.EntityFrameworkCore;

using FocusFlow.Data.Entities;
using FocusFlow.Data;

namespace FocusFlow.Repositories;

public class TaskItemRepository(AppDbContext appDbContext): ITaskItemRepository
{
    public IQueryable<TaskItem> Get()
    {
        return appDbContext.TaskItems.AsQueryable();
    }

    public async Task<TaskItem?> GetByIdAsync(int id)
    {
        return await appDbContext.TaskItems.FindAsync(id);
    }

    public async Task<IEnumerable<TaskItem>> GetAllAsync()
    {
        return await appDbContext.TaskItems.ToListAsync();
    }

    public void Add(TaskItem entity)
    {
        appDbContext.TaskItems.Add(entity);
    }

    public async Task AddAsync(TaskItem entity)
    {
        await appDbContext.TaskItems.AddAsync(entity);
    }

    public void Delete(TaskItem entity)
    {
        appDbContext.TaskItems.Remove(entity);
    }

    public void SaveChanges()
    {
        appDbContext.SaveChanges();
    }

    public async Task SaveChangesAsync()
    {
        await appDbContext.SaveChangesAsync();
    }

    /* ITaskRepository Functions. */

    public IEnumerable<TaskItem> GetTaskItemsByDueDate(DateTime dueDate)
    {
        return appDbContext.TaskItems
            .Where(taskItem => taskItem.DueDate.Date == dueDate.Date)
            .ToList();
    }
}