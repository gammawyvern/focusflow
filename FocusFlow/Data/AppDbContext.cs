using Microsoft.EntityFrameworkCore;

using FocusFlow.Models;

namespace FocusFlow.Data;

public class AppDbContext : DbContext
{
    public DbSet<TaskItem> Tasks { get; set; }

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
        
    }
}