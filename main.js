var roleHarvester = require('role.Harvester');
var roleUpgrader = require('role.Upgrader');
var roleBuilder = require('role.Builder');

module.exports.loop = function () {

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var inactive_spawns = _.filter(Game.spawns, (spawn) => spawn.isActive())
    var spawning_spawns = _.filter(Game.spawns, (spawn) => spawn.spawning)
    console.log('Harvesters: ' + harvesters.length);

    if(harvesters.length < 2 && inactive_spawns.length >0){
        var newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        var spawn = spawns[0]
        spawn.spawnCreep([WORK,CARRY,MOVE], newName,
            {memory: {role: 'harvester'}});
    }

    for (var spawn in spawning_spawns) {
        var spawningCreep = Game.creeps[spawn.spawning.name];
        spawn.room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            spawn.pos.x + 1,
            spawn.pos.y,
            {align: 'left', opacity: 0.8});
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
}
