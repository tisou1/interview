# pnpm

使用workspace

全局安装包
`pnpm add vitest -wD`
-w 表示在根目录安装

`pnpm add lodash -r` 表示安装lodash到所有子包中
`pnpm add lodash -r --filter @test/web` 表示只在@test/web这个子包中安装
