var roleHarvester = require('role.Harvester');
var roleUpgrader = require('role.Upgrader');
var roleBuilder = require('role.Builder');

module.exports.loop = function () {

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var inactive_spawns = _.filter(Game.spawns, (spawn) => spawn.isActive())
    console.log('Harvesters: ' + harvesters.length);

    if(harvesters.length < 2 && inactive_spawns.length >0){
        var newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        var spawn = spawns
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName,
            {memory: {role: 'harvester'}});
    }

    if(Game.spawns['Frumpf'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['Frumpf'].spawning.name];
        Game.spawns['Frumpf'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Frumpf'].pos.x + 1,
            Game.spawns['Frumpf'].pos.y,
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
