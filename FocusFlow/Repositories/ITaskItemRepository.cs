using FocusFlow.Data.Entities;

namespace FocusFlow.Repositories;

public interface ITaskItemRepository: IRepository<TaskItem>
{
    public IEnumerable<TaskItem> GetTaskItemsByDueDate(DateTime dueDate);
    public IQueryable<TaskItem> Get();
}