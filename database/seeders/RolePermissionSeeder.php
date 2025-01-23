<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Permission::create(['name' => 'menu-admin']);
        Permission::create(['name' => 'menu-chirp']);

        Role::create(['name'=>'admin']);

        $roleAdmin = Role::findByName('admin');
        $roleAdmin->givePermissionTo('menu-admin');
        $roleAdmin->givePermissionTo('menu-chirp');

    }
}
