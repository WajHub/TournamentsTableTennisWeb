package com.ttt.backend.configs;

import org.flywaydb.core.Flyway;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;

@Configuration
public class FlywayConfiguration {

    @Autowired
    public FlywayConfiguration(DataSource dataSource,
                               @Value("${migration.db.location}") String location) {
        Flyway.configure()
                .locations(location)
                .baselineOnMigrate(true).dataSource(dataSource).load().migrate();
    }
}