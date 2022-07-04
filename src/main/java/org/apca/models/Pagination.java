package org.apca.models;

public class Pagination {
	
	public int current_page;
	public int per_page;
	public int total_count;
	
	public Pagination(int curr_page, int per_page, int total_count)
    {
        this.current_page = curr_page;
        this.per_page = per_page;
        this.total_count = total_count;
    }
    
	
	
    public int get_offset()
    {
        return (this.current_page-1)*this.per_page;
    }
    public int total_pages()
    {
    	System.out.println(this.total_count/this.per_page);
        return (int)( Math.ceil(this.total_count/this.per_page));
    }
    
    public int previous_page()
    {
        return this.current_page-1;
    }
    
    public int next_page()
    {
        return this.current_page+1;
    }
    
    public boolean has_previous_page()
    {
        return (this.previous_page()>=0)?true:false;
    }
    
    public boolean has_next_page()
    {
        return (this.next_page()<this.total_pages())?true:false;
    }
    
	public int lowerBound()
	{
		if(this.total_count == 0)
		{
			return 0;
		}
		else
		{
			return ((this.current_page -1) * this.per_page) +1;
		}
	}
	public int upperBound()
	{
		
		int assumedUpperBound = this.per_page * this.current_page;
		
		if(assumedUpperBound > this.total_count)
		{
			return this.total_count;
		}
		else
		{
			return assumedUpperBound;
		}
	}

	public int getTotalCount()
	{
		return this.total_count;
	}
}
