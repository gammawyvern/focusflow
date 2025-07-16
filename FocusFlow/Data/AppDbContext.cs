using Microsoft.EntityFrameworkCore;

using Task = FocusFlow.Models.Task;

namespace FocusFlow.Data;

public class AppDbContext : DbContext
{
    public DbSet<Task> Tasks { get; set; }

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
        
    }
}