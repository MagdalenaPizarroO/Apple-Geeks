"""empty message

Revision ID: 25ba5ef4afa9
Revises: 8f211f72f2fb
Create Date: 2023-05-29 20:02:12.910047

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '25ba5ef4afa9'
down_revision = '8f211f72f2fb'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('categoria',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('nombre', sa.String(length=50), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('nombre')
    )
    op.create_table('proveedor',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('rut', sa.String(length=20), nullable=False),
    sa.Column('nombre', sa.String(length=100), nullable=False),
    sa.Column('apellido', sa.String(length=100), nullable=False),
    sa.Column('region', sa.String(length=100), nullable=False),
    sa.Column('comuna', sa.String(length=100), nullable=False),
    sa.Column('direccion', sa.String(length=200), nullable=False),
    sa.Column('correo', sa.String(length=100), nullable=False),
    sa.Column('telefono', sa.String(length=50), nullable=False),
    sa.Column('red_social', sa.String(length=100), nullable=True),
    sa.Column('contrasena', sa.String(length=20), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('correo')
    )
    op.create_table('servicio',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('titulo', sa.String(length=100), nullable=True),
    sa.Column('detalle', sa.String(length=3000), nullable=True),
    sa.Column('precio', sa.Integer(), nullable=False),
    sa.Column('proveedor_id', sa.Integer(), nullable=False),
    sa.Column('categoria_id', sa.Integer(), nullable=False),
    sa.Column('cobertura', sa.String(length=200), nullable=True),
    sa.Column('estado', sa.Boolean(), nullable=True),
    sa.ForeignKeyConstraint(['categoria_id'], ['categoria.id'], ),
    sa.ForeignKeyConstraint(['proveedor_id'], ['proveedor.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('imagen_servicio',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('secure_url', sa.String(length=400), nullable=False),
    sa.Column('servicio_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['servicio_id'], ['servicio.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('imagen_servicio')
    op.drop_table('servicio')
    op.drop_table('proveedor')
    op.drop_table('categoria')
    # ### end Alembic commands ###
