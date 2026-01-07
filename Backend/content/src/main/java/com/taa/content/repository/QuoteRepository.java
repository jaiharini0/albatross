package com.taa.content.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.taa.content.model.Quote;

public interface QuoteRepository extends JpaRepository<Quote, Long> {
}
