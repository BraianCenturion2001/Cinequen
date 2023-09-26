# Generated by Django 4.2.4 on 2023-09-26 11:51

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('peliculas', '0001_initial'),
        ('establecimientos', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='PeliculaxEstablecimiento',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('activo', models.BooleanField(default=True)),
                ('tipo', models.IntegerField(default=0)),
                ('establecimiento', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='establecimientos.establecimiento')),
                ('pelicula', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='peliculas.pelicula')),
            ],
        ),
    ]