import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        setupFiles: ['dotenv/config'],
        reporters: ['verbose'],
        coverage: {
            provider: 'istanbul',
            reporter: ['html', 'lcov'],
            reportsDirectory: './coverage',
            include: ['src/**/*.ts'],
            exclude: [
                'node_modules',
                'src/**/*.d.ts',
                'src/config/**',
                'src/types/**',
            ],
        },
    }
})