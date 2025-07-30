using Microsoft.EntityFrameworkCore;

using FocusFlow.Data.Entities;
using FocusFlow.Data;

namespace FocusFlow.Repositories;

public class TaskItemRepository(AppDbContext appDbContext): ITaskItemRepository
{
    private readonly AppDbContext _appDbContext = appDbContext;
    
    /* IRepository Functions. */

    public IQueryable<TaskItem> Get()
    {
        return _appDbContext.TaskItems.AsQueryable();
    }

    public async Task<TaskItem?> GetByIdAsync(int id)
    {
        return await _appDbContext.TaskItems.FindAsync(id);
    }

    public async Task<IEnumerable<TaskItem>> GetAllAsync()
    {
        return await _appDbContext.TaskItems.ToListAsync();
    }

    public void Add(TaskItem entity)
    {
        _appDbContext.TaskItems.Add(entity);
    }

    public async Task AddAsync(TaskItem entity)
    {
        await _appDbContext.TaskItems.AddAsync(entity);
    }

    public void Delete(TaskItem entity)
    {
        _appDbContext.TaskItems.Remove(entity);
    }

    public void SaveChanges()
    {
        _appDbContext.SaveChanges();
    }

    public async Task SaveChangesAsync()
    {
        await _appDbContext.SaveChangesAsync();
    }

    /* ITaskRepository Functions. */

    public IEnumerable<TaskItem> GetTaskItemsByDueDate(DateOnly dueDate)
    {
        return _appDbContext.TaskItems
            .Where(taskItem => taskItem.DueDate == dueDate)
            .ToList();
    }
}