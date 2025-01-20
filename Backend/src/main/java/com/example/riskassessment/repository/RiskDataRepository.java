package com.example.riskassessment.repository;

import com.example.riskassessment.model.RiskData;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RiskDataRepository extends JpaRepository<RiskData, Long> {
    List<RiskData> findByEmploymentStatus(String employmentStatus);

    List<RiskData> findByCity(String city);

    List<RiskData> findByState(String state);

    List<RiskData> findByCountry(String country);

    List<RiskData> findByDebtToIncomeRatioGreaterThan(double ratio);

    List<RiskData> findByNumberOfDependents(int dependents);

    List<RiskData> findByLoanAmountBetween(double minAmount, double maxAmount);
}