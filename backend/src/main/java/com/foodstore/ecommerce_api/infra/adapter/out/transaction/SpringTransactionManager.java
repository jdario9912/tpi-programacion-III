package com.foodstore.ecommerce_api.infra.adapter.out.transaction;

import com.foodstore.ecommerce_api.domain.model.interfaces.TransactionManager;
import org.springframework.stereotype.Component;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.support.TransactionTemplate;

import java.util.function.Supplier;

@Component
public class SpringTransactionManager implements TransactionManager {
    private final TransactionTemplate transactionTemplate;

    public SpringTransactionManager(PlatformTransactionManager platformTransactionManager) {
        this.transactionTemplate = new TransactionTemplate(platformTransactionManager);
    }

    @Override
    public <T> T execute(Supplier<T> operation) {
        return transactionTemplate.execute(status -> operation.get());
    }

    @Override
    public void execute(Runnable operation) {
        transactionTemplate.execute(status -> {
            operation.run();
            return null;
        });
    }
}
