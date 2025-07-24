using Microsoft.AspNetCore.Mvc;

using FocusFlow.Helpers.Mapping;
using FocusFlow.Repositories;
using FocusFlow.Dtos;

namespace FocusFlow.Controllers.Api;

[ApiController]
[Route("api/tasks")]
public class TaskApiController(ITaskItemRepository taskItemRepository) : Controller
{
    [HttpPost]
    public async Task<IActionResult> CreateTask([FromBody] TaskItemDto dto)
    {
        var entity = TaskItemMapper.ToEntity(dto);
        await taskItemRepository.AddAsync(entity);
        await taskItemRepository.SaveChangesAsync();
        
        var resultDto = TaskItemMapper.ToDto(entity);

        return CreatedAtAction(nameof(GetTask), new { id = resultDto.Id }, resultDto);
    }
    
    [HttpGet]
    public async Task<IActionResult> GetTasks()
    {
        var entities = await taskItemRepository.GetAllAsync();
        var dtos = entities.Select(TaskItemMapper.ToDto).ToList();
        return Ok(dtos);
    }
    
    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetTask([FromRoute] int id)
    {
        var entity = await taskItemRepository.GetByIdAsync(id);
        return entity == null ? NotFound() : Ok(TaskItemMapper.ToDto(entity));
    }
    
    [HttpPut("{id:int}")]
    public async Task<IActionResult> UpdateTask([FromRoute] int id, [FromBody] TaskItemDto dto)
    {
        if (id != dto.Id) { return BadRequest("Mismatched task IDs."); }
        
        var entity = await taskItemRepository.GetByIdAsync(dto.Id);
        if (entity == null) { return NotFound(); }
        
        TaskItemMapper.ApplyDtoToEntity(dto, entity);
        await taskItemRepository.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteTask([FromRoute] int id)
    {
        var entity = await taskItemRepository.GetByIdAsync(id);
        if (entity == null) { return NotFound(); }
        
        taskItemRepository.Delete(entity);
        await taskItemRepository.SaveChangesAsync();
        
        return NoContent();
    }
}