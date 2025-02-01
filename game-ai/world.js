var world = {
    agents: null,

    create: function() {
        var obj = Object.create();
        obj.agents = [];
        return obj;
    },

    addAgent: function(agent) {
        for(var i = 0; i < this.agents.length; ++i)
        {
            if(this.agents[i].id == agent.id)
            {
                return false;
            }
        }

        this.agents.push(agent);
        return true;
    }
}