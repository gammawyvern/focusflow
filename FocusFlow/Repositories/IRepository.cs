namespace FocusFlow.Repositories;

public interface IRepository<T>
{
    public Task<T?> GetByIdAsync(int id);
    public Task<IEnumerable<T>> GetAllAsync();
    public void Add(T entity);
    public void Delete(T entity);
}