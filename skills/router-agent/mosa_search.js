const fs = require('fs');
const path = require('path');
const os = require('os');

const query = process.argv.slice(2).join(' ').toLowerCase();
const registryDir = path.join(os.homedir(), '.gemini', 'antigravity', 'skills', 'registry');
const indexPath = path.join(registryDir, '_index.json');

if (!query) {
    console.log(JSON.stringify({ status: 'error', message: 'No query provided' }));
    process.exit(1);
}

if (!fs.existsSync(indexPath)) {
    console.log(JSON.stringify({ status: 'error', message: 'Registry index not found' }));
    process.exit(1);
}

const index = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
const candidateShards = new Set();

// 1. Identify candidate shards by category or tags
Object.keys(index.categories).forEach(cat => {
    if (query.includes(cat)) candidateShards.add(cat);
});

Object.keys(index.all_tags).forEach(tag => {
    if (query.includes(tag)) {
        index.all_tags[tag].forEach(cat => candidateShards.add(cat));
    }
});

// Fallback: If no shard found, search all (but prioritize design/tech/core)
if (candidateShards.size === 0) {
    Object.keys(index.categories).forEach(cat => candidateShards.add(cat));
}

let allCandidates = [];
candidateShards.forEach(cat => {
    const shardPath = path.join(registryDir, `${cat}.json`);
    if (fs.existsSync(shardPath)) {
        const skills = JSON.parse(fs.readFileSync(shardPath, 'utf8'));
        allCandidates = allCandidates.concat(skills);
    }
});

// 2. Score skills based on keyword overlap
const queryWords = query.split(/\s+/);

const scored = allCandidates.map(skill => {
    let score = 0;
    const skillId = skill.skill_id.toLowerCase();
    const tags = (skill.tags || []).map(t => t.toLowerCase());
    const cat = (skill.category || '').toLowerCase();

    // Exact Skill ID match (highest priority)
    if (query === skillId || queryWords.includes(skillId)) score += 50;

    // Tag match
    tags.forEach(tag => {
        if (query === tag || queryWords.includes(tag)) score += 20;
        else if (query.includes(tag)) score += 10; 
    });

    // Category match
    if (query === cat || queryWords.includes(cat)) score += 10;

    return { ...skill, search_score: score };
});

// 3. Return Top 3
const results = scored
    .filter(s => s.search_score > 0)
    .sort((a, b) => b.search_score - a.search_score)
    .slice(0, 3);

console.log(JSON.stringify({
    status: 'success',
    results: results.map(r => ({
        skill_id: r.skill_id,
        filepath: r.filepath,
        category: r.category,
        tags: r.tags
    }))
}, null, 2));
