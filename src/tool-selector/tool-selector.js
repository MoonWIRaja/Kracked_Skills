const axios = require('axios');

class IntelligentToolSelector {
    constructor() {
        this.knowledgeBase = require('./knowledge-base.json');
        this.contextFactors = {};
    }
    
    async analyzeContext(projectInfo) {
        console.log('🔍 Analyzing project context...');
        
        this.contextFactors = {
            projectType: projectInfo.type,  // web, mobile, desktop, api, etc.
            scale: projectInfo.scale,  // small, medium, large
            teamSize: projectInfo.teamSize,
            timeline: projectInfo.timeline,  // weeks
            budget: projectInfo.budget,
            existingStack: projectInfo.existingStack || [],
            requirements: projectInfo.requirements || [],
            teamExpertise: projectInfo.teamExpertise || []
        };
        
        return this.contextFactors;
    }
    
    async selectFrontendFramework(context) {
        console.log('\n📦 Selecting Frontend Framework...');
        
        const options = ['React', 'Vue', 'Angular', 'Svelte', 'Next.js', 'Nuxt'];
        const scores = {};
        
        for (const framework of options) {
            scores[framework] = await this.scoreFramework(framework, context);
        }
        
        // Sort by score
        const ranked = Object.entries(scores)
            .sort((a, b) => b[1].totalScore - a[1].totalScore);
        
        const winner = ranked[0];
        const runnerUp = ranked[1];
        
        return {
            recommended: winner[0],
            score: winner[1],
            alternative: runnerUp[0],
            alternativeScore: runnerUp[1],
            reasoning: this.generateReasoning(winner, runnerUp, context)
        };
    }
    
    async scoreFramework(framework, context) {
        const criteria = {
            teamExpertise: 0,
            learningCurve: 0,
            ecosystem: 0,
            performance: 0,
            scalability: 0,
            community: 0,
            jobMarket: 0,
            suitability: 0
        };
        
        const weights = {
            teamExpertise: 0.25,
            learningCurve: 0.15,
            ecosystem: 0.15,
            performance: 0.15,
            scalability: 0.10,
            community: 0.10,
            jobMarket: 0.05,
            suitability: 0.05
        };
        
        // 1. Team Expertise
        if (context.teamExpertise.includes(framework.toLowerCase())) {
            criteria.teamExpertise = 10;
        } else if (context.teamExpertise.includes('javascript')) {
            criteria.teamExpertise = framework === 'React' ? 8 : 6;
        } else {
            criteria.teamExpertise = 3;
        }
        
        // 2. Learning Curve (research from knowledge base)
        const frameworkData = this.knowledgeBase.frameworks.frontend[framework];
        criteria.learningCurve = frameworkData.learningCurve;
        
        // 3. Ecosystem
        criteria.ecosystem = frameworkData.ecosystem;
        
        // 4. Performance
        criteria.performance = frameworkData.performance;
        
        // 5. Scalability
        criteria.scalability = frameworkData.scalability;
        
        // 6. Community
        criteria.community = frameworkData.community;
        
        // 7. Job Market
        criteria.jobMarket = await this.getJobMarketScore(framework);
        
        // 8. Suitability for project type
        criteria.suitability = this.calculateSuitability(framework, context);
        
        // Calculate weighted score
        const totalScore = Object.entries(criteria).reduce((sum, [key, value]) => {
            return sum + (value * weights[key]);
        }, 0);
        
        return {
            criteria,
            weights,
            totalScore: Math.round(totalScore * 10) / 10
        };
    }
    
    async getJobMarketScore(framework) {
        // Simulate API call to job boards
        // Real implementation would call Indeed/LinkedIn APIs
        const jobCounts = {
            'React': 10,
            'Vue': 7,
            'Angular': 8,
            'Svelte': 4,
            'Next.js': 9,
            'Nuxt': 6
        };
        
        return jobCounts[framework] || 5;
    }
    
    calculateSuitability(framework, context) {
        let score = 5;  // baseline
        
        // Project type suitability
        if (context.projectType === 'web') {
            if (['Next.js', 'Nuxt'].includes(framework)) score += 3;  // SSR
            if (['React', 'Vue'].includes(framework)) score += 2;
        } else if (context.projectType === 'mobile') {
            if (framework === 'React') score += 4;  // React Native
        } else if (context.projectType === 'dashboard') {
            if (['React', 'Vue'].includes(framework)) score += 3;
        }
        
        // Scale suitability
        if (context.scale === 'large') {
            if (['React', 'Angular', 'Next.js'].includes(framework)) score += 2;
        } else if (context.scale === 'small') {
            if (['Svelte', 'Vue'].includes(framework)) score += 2;
        }
        
        // Timeline suitability
        if (context.timeline < 8) {  // < 8 weeks
            if (['Next.js', 'Nuxt'].includes(framework)) score += 2;  // batteries included
        }
        
        return Math.min(score, 10);
    }
    
    generateReasoning(winner, runnerUp, context) {
        return `
**Why ${winner[0]}?**

1. **Team Expertise** (Score: ${winner[1].criteria.teamExpertise}/10)
   ${context.teamExpertise.includes(winner[0].toLowerCase()) 
       ? `Your team already has ${winner[0]} experience.`
       : 'Learning curve is manageable for your team.'}

2. **Ecosystem** (Score: ${winner[1].criteria.ecosystem}/10)
   ${winner[0]} has a rich ecosystem with extensive libraries and tools.

3. **Performance** (Score: ${winner[1].criteria.performance}/10)
   ${winner[1].criteria.performance >= 8 
       ? 'Excellent performance for production use.'
       : 'Good performance, suitable for most use cases.'}

4. **Project Suitability** (Score: ${winner[1].criteria.suitability}/10)
   ${winner[1].criteria.suitability >= 8
       ? `${winner[0]} is highly suitable for ${context.projectType} projects.`
       : `${winner[0]} can handle ${context.projectType} projects well.`}

**Alternative: ${runnerUp[0]}** (Score: ${runnerUp[1].totalScore})
${runnerUp[0]} is also a strong choice with score ${runnerUp[1].totalScore}, 
just ${(winner[1].totalScore - runnerUp[1].totalScore).toFixed(1)} points behind.
Consider it if: ${this.getAlternativeConsideration(runnerUp[0], context)}
`;
    }
    
    getAlternativeConsideration(framework, context) {
        const considerations = {
            'Vue': 'you prefer a gentler learning curve and simpler syntax',
            'Angular': 'you need enterprise-grade structure and TypeScript by default',
            'Svelte': 'you want the smallest bundle size and fastest runtime',
            'Next.js': 'you need SEO and server-side rendering out of the box',
            'Nuxt': 'you prefer Vue and need SSR capabilities'
        };
        
        return considerations[framework] || 'your requirements change';
    }
    
    async selectBackendFramework(context) {
        console.log('\n🔧 Selecting Backend Framework...');
        
        const options = {
            'Node.js': ['Express', 'NestJS', 'Fastify', 'Hapi'],
            'Python': ['Django', 'Flask', 'FastAPI'],
            'Java': ['Spring Boot', 'Micronaut'],
            'Go': ['Gin', 'Echo', 'Fiber'],
            'PHP': ['Laravel', 'Symfony']
        };
        
        // First select language
        const language = await this.selectBackendLanguage(context);
        
        // Then select framework
        const frameworks = options[language];
        const scores = {};
        
        for (const framework of frameworks) {
            scores[framework] = await this.scoreBackendFramework(framework, context);
        }
        
        const ranked = Object.entries(scores)
            .sort((a, b) => b[1].totalScore - a[1].totalScore);
        
        return {
            language,
            recommended: ranked[0][0],
            score: ranked[0][1],
            reasoning: this.generateBackendReasoning(ranked[0], context)
        };
    }
    
    async selectBackendLanguage(context) {
        // Analyze context to choose language
        const teamLang = context.teamExpertise.find(lang => 
            ['javascript', 'python', 'java', 'go', 'php'].includes(lang.toLowerCase())
        );
        
        if (teamLang) {
            const langMap = {
                'javascript': 'Node.js',
                'python': 'Python',
                'java': 'Java',
                'go': 'Go',
                'php': 'PHP'
            };
            return langMap[teamLang.toLowerCase()];
        }
        
        // Default based on project type
        if (context.projectType === 'api' && context.scale === 'large') {
            return 'Java';  // Enterprise-grade
        } else if (context.projectType === 'ml') {
            return 'Python';  // ML ecosystem
        } else {
            return 'Node.js';  // General purpose, matches frontend
        }
    }
    
    async scoreBackendFramework(framework, context) {
        const frameworkData = this.knowledgeBase.frameworks.backend[framework];
        
        if (!frameworkData) {
            // Fallback scoring
            return { totalScore: 5 };
        }
        
        const criteria = {
            performance: frameworkData.performance,
            scalability: frameworkData.scalability,
            ecosystem: frameworkData.ecosystem,
            learningCurve: frameworkData.learningCurve,
            community: frameworkData.community
        };
        
        const weights = {
            performance: 0.25,
            scalability: 0.25,
            ecosystem: 0.20,
            learningCurve: 0.15,
            community: 0.15
        };
        
        const totalScore = Object.entries(criteria).reduce((sum, [key, value]) => {
            return sum + (value * weights[key]);
        }, 0);
        
        return {
            criteria,
            weights,
            totalScore: Math.round(totalScore * 10) / 10
        };
    }
    
    generateBackendReasoning(winner, context) {
        return `
**Why ${winner[0]}?**

- **Performance**: ${winner[1].criteria.performance}/10
- **Scalability**: ${winner[1].criteria.scalability}/10
- **Ecosystem**: ${winner[1].criteria.ecosystem}/10

${winner[0]} is well-suited for ${context.projectType} projects at ${context.scale} scale.
`;
    }
    
    async selectDatabase(context) {
        console.log('\n💾 Selecting Database...');
        
        const options = [
            'PostgreSQL',
            'MySQL',
            'MongoDB',
            'Redis',
            'DynamoDB',
            'Cassandra',
            'Neo4j'
        ];
        
        const scores = {};
        
        for (const db of options) {
            scores[db] = await this.scoreDatabase(db, context);
        }
        
        const ranked = Object.entries(scores)
            .sort((a, b) => b[1].totalScore - a[1].totalScore);
        
        return {
            primary: ranked[0][0],
            cache: 'Redis',  // Always recommend Redis for caching
            reasoning: this.generateDatabaseReasoning(ranked, context)
        };
    }
    
    async scoreDatabase(database, context) {
        const dbData = this.knowledgeBase.databases[database];
        
        if (!dbData) {
            return { totalScore: 5 };
        }
        
        let score = dbData.baseScore;
        
        // Adjust based on data type
        if (context.requirements.includes('relational_data')) {
            if (['PostgreSQL', 'MySQL'].includes(database)) score += 2;
        } else if (context.requirements.includes('document_data')) {
            if (database === 'MongoDB') score += 2;
        } else if (context.requirements.includes('graph_data')) {
            if (database === 'Neo4j') score += 3;
        }
        
        // Adjust based on scale
        if (context.scale === 'large') {
            if (['PostgreSQL', 'Cassandra', 'DynamoDB'].includes(database)) score += 1;
        }
        
        // Adjust based on ACID requirements
        if (context.requirements.includes('acid_compliance')) {
            if (['PostgreSQL', 'MySQL'].includes(database)) score += 2;
            if (database === 'MongoDB') score -= 1;
        }
        
        return {
            baseScore: dbData.baseScore,
            adjustments: score - dbData.baseScore,
            totalScore: Math.min(score, 10)
        };
    }
    
    generateDatabaseReasoning(ranked, context) {
        const top3 = ranked.slice(0, 3);
        
        return `
**Recommended Database Stack:**

1. **Primary: ${top3[0][0]}** (Score: ${top3[0][1].totalScore})
   ${this.getDatabaseDescription(top3[0][0])}

2. **Caching: Redis**
   Essential for performance at scale. Use for:
   - Session storage
   - API response caching
   - Rate limiting
   - Real-time features

3. **Alternative: ${top3[1][0]}** (Score: ${top3[1][1].totalScore})
   Consider if: ${this.getDatabaseAlternative(top3[1][0], context)}
`;
    }
    
    getDatabaseDescription(database) {
        const descriptions = {
            'PostgreSQL': 'ACID compliant, excellent for relational data, JSONB for flexibility',
            'MongoDB': 'Schema flexibility, horizontal scaling, good for rapid iteration',
            'Redis': 'In-memory, blazing fast, perfect for caching and real-time',
            'MySQL': 'Proven reliability, wide hosting support, good for traditional apps',
            'DynamoDB': 'Serverless, auto-scaling, pay-per-use, AWS integration',
            'Cassandra': 'Distributed, high availability, linear scalability',
            'Neo4j': 'Graph database, perfect for relationships and social networks'
        };
        
        return descriptions[database] || 'Solid choice for your use case';
    }
    
    getDatabaseAlternative(database, context) {
        return `your requirements change or you need ${database}'s specific strengths`;
    }
    
    async generateFullStack(projectInfo) {
        const context = await this.analyzeContext(projectInfo);
        
        console.log('🚀 Generating Full Stack Recommendation...\n');
        
        const frontend = await this.selectFrontendFramework(context);
        const backend = await this.selectBackendFramework(context);
        const database = await this.selectDatabase(context);
        
        // Additional tools
        const tools = await this.selectAdditionalTools(context);
        
        return {
            context,
            frontend,
            backend,
            database,
            tools,
            summary: this.generateStackSummary(frontend, backend, database, tools)
        };
    }
    
    async selectAdditionalTools(context) {
        return {
            stateManagement: this.selectStateManagement(context),
            styling: this.selectStyling(context),
            testing: this.selectTesting(context),
            deployment: this.selectDeployment(context),
            monitoring: this.selectMonitoring(context)
        };
    }
    
    selectStateManagement(context) {
        // Simple heuristic-based selection
        if (context.existingStack.includes('React')) {
            return {
                recommended: 'Zustand',
                alternatives: ['Redux Toolkit', 'Jotai', 'Recoil'],
                reasoning: 'Zustand is lightweight and easy to use. Use Redux Toolkit if you need time-travel debugging or complex middleware.'
            };
        } else if (context.existingStack.includes('Vue')) {
            return {
                recommended: 'Pinia',
                alternatives: ['Vuex'],
                reasoning: 'Pinia is the official state management for Vue 3 with better TypeScript support.'
            };
        } else {
            return {
                recommended: 'Context API',
                alternatives: ['Zustand'],
                reasoning: 'Start with Context API for simple state. Upgrade to Zustand if complexity grows.'
            };
        }
    }
    
    selectStyling(context) {
        return {
            recommended: 'Tailwind CSS',
            alternatives: ['CSS Modules', 'Styled Components', 'Emotion'],
            reasoning: 'Tailwind CSS offers rapid development with utility classes. Pairs well with shadcn/ui for pre-built components.'
        };
    }
    
    selectTesting(context) {
        return {
            unit: 'Vitest',
            e2e: 'Playwright',
            reasoning: 'Vitest is fast and compatible with Vite. Playwright handles cross-browser E2E testing.'
        };
    }
    
    selectDeployment(context) {
        if (context.scale === 'small') {
            return {
                recommended: 'Vercel',
                alternatives: ['Netlify', 'Railway'],
                reasoning: 'Vercel offers zero-config deployment for Next.js and other frameworks.'
            };
        } else {
            return {
                recommended: 'AWS (ECS + CloudFront)',
                alternatives: ['Google Cloud Run', 'Azure App Service'],
                reasoning: 'AWS provides enterprise-grade scalability and control.'
            };
        }
    }
    
    selectMonitoring(context) {
        return {
            recommended: 'Sentry',
            alternatives: ['LogRocket', 'Datadog'],
            reasoning: 'Sentry provides excellent error tracking and performance monitoring.'
        };
    }
    
    generateStackSummary(frontend, backend, database, tools) {
        return `
## 🏗️ Recommended Tech Stack

### Frontend
- **Framework**: ${frontend.recommended} (Score: ${frontend.score.totalScore})
- **State**: ${tools.stateManagement.recommended}
- **Styling**: ${tools.styling.recommended}

### Backend
- **Framework**: ${backend.recommended} (${backend.language})
- **Database**: ${database.primary} + ${database.cache}

### Infrastructure
- **Deployment**: ${tools.deployment.recommended}
- **Testing**: ${tools.testing.unit} + ${tools.testing.e2e}
- **Monitoring**: ${tools.monitoring.recommended}
`;
    }
}

module.exports = IntelligentToolSelector;
