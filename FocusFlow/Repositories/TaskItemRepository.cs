using FocusFlow.Data;
using FocusFlow.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace FocusFlow.Repositories;

public class TaskItemRepository(AppDbContext appDbContext): IRepository<TaskItem>
{
    private readonly AppDbContext _appDbContext = appDbContext;
    
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

    public void Delete(TaskItem entity)
    {
        _appDbContext.TaskItems.Remove(entity);
    }
    
    /* Custom Task Functions. */

    public IEnumerable<TaskItem> GetTasksByDate(DateOnly date)
    {
        return _appDbContext.TaskItems
            .Where(taskItem => taskItem.DueDate == date)
            .ToList();
    }
}