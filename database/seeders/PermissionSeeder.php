<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        // create permissions
        Permission::create(['name' => 'create content']);
        Permission::create(['name' => 'edit content']);
        Permission::create(['name' => 'delete content']);
        Permission::create(['name' => 'publish content']);
        Permission::create(['name' => 'unpublish content']);
        Permission::create(['name' => 'create users']);
        Permission::create(['name' => 'edit users']);
        Permission::create(['name' => 'delete users']);

        // create roles and assign existing permissions
        $role1 = Role::create(['name' => 'editor']);
        $role1->givePermissionTo('create content');
        $role1->givePermissionTo('edit content');
        $role1->givePermissionTo('delete content');
        $role1->givePermissionTo('publish content');
        $role1->givePermissionTo('unpublish content');

        $role2 = Role::create(['name' => 'admin']);
        //Content
        $role2->givePermissionTo('create content');
        $role2->givePermissionTo('edit content');
        $role2->givePermissionTo('delete content');
        $role2->givePermissionTo('publish content');
        $role2->givePermissionTo('unpublish content');
        //Users
        $role2->givePermissionTo('create users');
        $role2->givePermissionTo('edit users');
        $role2->givePermissionTo('delete users');

        $role3 = Role::create(['name' => 'Super-Admin']);
        // gets all permissions via Gate::before rule; see AuthServiceProvider

/*        // create demo users
        $user = \App\Models\User::factory()->create([
            'name' => 'Example User',
            'email' => 'test@example.com',
        ]);
        $user->assignRole($role1);

        $user = \App\Models\User::factory()->create([
            'name' => 'Example Admin User',
            'email' => 'admin@example.com',
        ]);
        $user->assignRole($role2);

        $user = \App\Models\User::factory()->create([
            'name' => 'Example Super-Admin User',
            'email' => 'superadmin@example.com',
        ]);
        $user->assignRole($role3);*/
    }
}
